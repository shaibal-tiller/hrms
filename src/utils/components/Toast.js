import { toast } from 'react-toastify'

const showToast=(messege,type="success",position='BOTTOM_RIGHT')=>{
    toast[type](messege, {
        position: toast.POSITION[position]
    });
}

export default showToast