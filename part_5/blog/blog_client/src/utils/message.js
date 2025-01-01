const typedMessage = (setMessage) => (message, type) => {
    setMessage({
        type: type === 'error' ? 'error' : 'success',
        notification: message,
    });

    setTimeout(() => {
        setMessage({
            type: '',
            notification: ''
        });
    }, 5000);
};

export default typedMessage;
