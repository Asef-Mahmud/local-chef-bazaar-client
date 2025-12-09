import toast from "react-hot-toast";



export const chefToast = {
  success: (message) =>
    toast.success(message, {
      style: {
        border: '1px solid #F5F5F5',
        padding: '16px',
        color: '#F5F5F5',
        background: '#1A1A1A',
        borderRadius: '12px',
      },
      iconTheme: {
        primary: '#F5F5F5',
        secondary: '#4CAF50',
      },
    }),

  error: (message) =>
    toast.error(message, {
      style: {
        border: '1px solid #F5F5F5',
        padding: '16px',
        color: '#F5F5F5',
        background: '#1A1A1A',
        borderRadius: '12px',
      },
      iconTheme: {
        primary: '#F5F5F5',
        secondary: '#E53935',
      },
    }),
};