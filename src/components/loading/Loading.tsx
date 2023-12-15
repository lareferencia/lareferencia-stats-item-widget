import { MoonLoader } from 'react-spinners';

type LoadingProps = {
  styles: any;
}
const Loading: React.FC<LoadingProps>  = ({styles}) => {

  return (
    <div style={{height: `${styles.height}`, display:'flex', justifyContent:'center', alignItems:'center'}}>
       
        <MoonLoader
          color="#080a09"
          cssOverride={{}}
          size={40}
          speedMultiplier={1}
        />

    </div>
  )
}

export default Loading
