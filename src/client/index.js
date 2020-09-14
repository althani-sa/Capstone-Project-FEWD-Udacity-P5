import './styles/style.scss';
import drone_4k from '../client/assets/drone_4k.mp4';
import {
    handleSubmit
} from './js/app';


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btn__submit").addEventListener("click", handleSubmit)
})

// export to client library
export {
    handleSubmit,
    drone_4k
}