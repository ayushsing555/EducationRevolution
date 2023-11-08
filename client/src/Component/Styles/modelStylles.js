export const modalStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '500px',
        maxHeight: '80vh', // Set a maximum height (80% of the viewport height)
        overflowY: 'auto', //  Add vertical scrollbar when content exceeds the height
    },
};