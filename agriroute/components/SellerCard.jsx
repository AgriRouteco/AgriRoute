export default function SellerCard({ seller }) {
  return (
    <div style={{display:'flex', gap:12, background:'#fff', padding:12, borderRadius:8}}>
      <div style={{width:64, height:64, background:'#f3f4f6', borderRadius:8}} />
      <div style={{flex:1}}>
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <div>
            <div style={{fontWeight:600}}>{seller?.farmName}</div>
            <div style={{color:'#6b7280', fontSize:13}}>{seller?.name} • {seller?.distanceKm} km</div>
          </div>
          <div style={{color:'#f59e0b'}}>{'★'.repeat(Math.round(seller?.rating||4))}</div>
        </div>
        <div style={{marginTop:8, color:'#374151'}}>{seller?.bio?.slice?.(0,120)}</div>
      </div>
    </div>
  )
}
