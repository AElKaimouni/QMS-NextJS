import Swal, { SweetAlertOptions } from 'sweetalert2';

type ColorType = 'success' | 'warning' | 'danger' | 'info';

export const coloredToast = (color: ColorType, message: string, options?: SweetAlertOptions) => {
    const toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        showCloseButton: true,
        customClass: {
            popup: `color-${color}`,
        },
    });
    toast.fire({
        title: message,
        ...options,
    });
};
