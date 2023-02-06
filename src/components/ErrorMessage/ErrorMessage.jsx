const ErrorCluster = ({ errors }) => {
    return (
        <div style={{ position: 'fixed', bottom: 30, right: 30 }}>
            {
                errors.map((err, index) => {
                    return (
                        < p key={index} className='ErrorMessage mt-2'>
                            {err}
                        </p>
                    )
                })
            }
        </div>
    )
}

export default ErrorCluster