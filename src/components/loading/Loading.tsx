import { MoonLoader } from 'react-spinners';

export const Loading = () => {
  return (
    <div style={{height: '450px', display:'flex', justifyContent:'center', alignItems:'center'}}>
       
        <MoonLoader
          color="#080a09"
          cssOverride={{}}
          size={70}
          speedMultiplier={1}
        />

    </div>
  )
}
