import Swal from "sweetalert2";

export const customSuccessAlert = () =>{
    return Swal.fire(
        'Good job!',
        'You have successfully registered!',
        'success'
    )
}

