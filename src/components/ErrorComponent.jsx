const ErrorComponent = ({ error }) => {
    return <p className="Error">{ error.response.data.msg }</p>
};

export default ErrorComponent;