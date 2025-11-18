// pages/create-listing.js
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'

export default function CreateListing() {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [unit, setUnit] = useState('')
  const [quantity, setQuantity] = useState('')
  const [minOrder, setMinOrder] = useState('')
  const [deliveryOption, setDeliveryOption] = useState('collection')
  const [imageFile, setImageFile] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    // 1. Get logged-in user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      alert('You must be logged in as a farmer to create a listing.')
      setLoading(false)
      return
    }

    let image_url = null

    // 2. Upload image to Supabase Storage
    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop()
      const fileName = `${user.id}-${Date.now()}.${fileExt}`

      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('listing-images')
        .upload(fileName, imageFile)

      if (uploadError) {
        console.error(uploadError)
        alert('Image upload failed.')
        setLoading(false)
        return
      }

      // Get public image URL
      image_url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/your-bucket-name/${fileName}`
    }

    // 3. Insert listing into database
    const { error: insertError } = await supabase
      .from('listings')
      .insert([
        {
          farmer_id: user.id,
          title,
          description,
          category,
          price,
          unit,
          quantity,
          min_order: minOrder,
          delivery_option: deliveryOption,
          image_url
        }
      ])

    if (insertError) {
      console.error(insertError)
      alert('Failed to create listing.')
      setLoading(false)
      return
    }

    alert('Listing created successfully!')
    router.push('/business') // or wherever listings should go
  }

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 20 }}>
      <h1>Create New Listing</h1>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>

        <input 
          type="text" 
          placeholder="Product title"
          value={title} 
          onChange={(e)=>setTitle(e.target.value)}
          required
        />

        <textarea 
          placeholder="Description"
          value={description} 
          onChange={(e)=>setDescription(e.target.value)}
          required
        />

        <input 
          type="text" 
          placeholder="Category (e.g. Vegetables, Dairy, Fruit)"
          value={category} 
          onChange={(e)=>setCategory(e.target.value)}
          required
        />

        <input 
          type="number" 
          placeholder="Price"
          step="0.01"
          value={price} 
          onChange={(e)=>setPrice(e.target.value)}
          required
        />

        <input 
          type="text" 
          placeholder="Unit (kg, litre, item)"
          value={unit} 
          onChange={(e)=>setUnit(e.target.value)}
          required
        />

        <input 
          type="number" 
          placeholder="Quantity available"
          value={quantity} 
          onChange={(e)=>setQuantity(e.target.value)}
          required
        />

        <input 
          type="number" 
          placeholder="Minimum order quantity"
          value={minOrder} 
          onChange={(e)=>setMinOrder(e.target.value)}
          required
        />

        <label>Delivery Option:</label>
        <select 
          value={deliveryOption} 
          onChange={(e)=>setDeliveryOption(e.target.value)}
        >
          <option value="collection">Collection</option>
          <option value="delivery">Delivery</option>
          <option value="both">Both</option>
        </select>

        <label>Product Image:</label>
        <input 
          type="file"
          onChange={(e)=>setImageFile(e.target.files[0])}
          accept="image/*"
        />

        <button 
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 15px',
            background: '#16a34a',
            color: 'white',
            borderRadius: 6,
            fontWeight: 600
          }}
        >
          {loading ? 'Creating…' : 'Create Listing'}
        </button>

      </form>
    </div>
  )
}
