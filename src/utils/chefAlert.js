import Swal from "sweetalert2";


export const chefAlert = ({ title, text, icon = 'warning', confirmText = 'Confirm', cancelText = 'Cancel', showConfirm = true, showCancel = true, time = 0}) => {
    return Swal.fire({
        title: title,
        text: text,
        icon: icon,
        showCancelButton: showCancel,
        showConfirmButton: showConfirm,
        confirmButtonColor: '#C9A86A',
        cancelButtonColor: '#1A1A1A',  
        iconColor: "#C9A86A",
        timer: time,
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
        background: '#F5F5F5', 
        color: '#1A1A1A',      
        customClass: {
            title: 'text-xl font-bold', 
            content: 'text-base'
        }
    });
};

