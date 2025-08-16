
import { useEffect, useMemo, useState } from 'react'

export default function WorldTime({ ctx }){
  const [offset, setOffset] = useState(8) // default UTC+8
  const [now, setNow] = useState(Date.now())
  useEffect(()=>{
    const id = setInterval(()=> setNow(Date.now()), 1000)
    return ()=> clearInterval(id)
  },[])
  const date = useMemo(()=>{
    const d = new Date(now + offset*3600*1000 - (new Date().getTimezoneOffset()/60)*3600*1000)
    return d
  },[now, offset])

  return (
    <div className="card" style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:10}}>
      <div style={{display:'flex',alignItems:'center',gap:8}}>
        <span>🕒</span>
        <div style={{fontWeight:700}}>全球时差</div>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:8}}>
        <label style={{fontSize:12,opacity:.8}}>UTC</label>
        <input type="range" min="-12" max="14" value={offset} onChange={e=>setOffset(parseInt(e.target.value))}/>
        <div style={{width:60,textAlign:'right',fontVariantNumeric:'tabular-nums'}}> {offset>=0?'+':''}{offset}</div>
        <div style={{width:120,textAlign:'right',fontVariantNumeric:'tabular-nums'}}>
          {date.toLocaleTimeString()}
        </div>
      </div>
    </div>
  )
}
