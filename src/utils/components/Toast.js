import { toast } from 'react-toastify'

const showToast=(messege,type="success",position='BOTTOM_RIGHT',time=1000)=>{
    toast[type](messege, {
        position: toast.POSITION[position],
        autoClose: time,
    });
}

export default showToast