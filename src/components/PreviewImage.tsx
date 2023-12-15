import style from '../styles/app.module.css';
import previewImageSrc from '../assets/widget-preview.png'; // Asegúrate de especificar la ruta correcta de tu imagen



const PreviewImage = () => {
  return (
    <div className={style.container} 
        style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
        <img
          className={style.preview_img}
          src={previewImageSrc} alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
  )
}

export default PreviewImage
