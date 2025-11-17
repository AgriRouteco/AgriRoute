export default function FeaturedFarmers() {
  const farms = [
    { farmName:'Green Vale', name:'L. Green', distanceKm:6, rating:4 },
    { farmName:'Hillside Farm', name:'A. Hill', distanceKm:12, rating:5 },
    { farmName:'River Produce', name:'M. River', distanceKm:3, rating:4.5 },
  ]
  return (
    <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:12}}>
      {farms.map(f => (
        <div key={f.farmName} style={{background:'#fff', padding:12, borderRadius:8}}>
          <div style={{fontWeight:600}}>{f.farmName}</div>
          <div style={{color:'#6b7280'}}>{f.name} • {f.distanceKm} km</div>
          <div style={{marginTop:8}}>{'★'.repeat(Math.round(f.rating))}</div>
        </div>
      ))}
    </div>
  )
}
