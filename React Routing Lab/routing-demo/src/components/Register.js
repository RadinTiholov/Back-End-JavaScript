export const Register = () => {

    
    return (
        <form>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    name= 'email'
                />
                <small id="emailHelp" className="form-text text-success">
                    We'll never share your email with anyone else.
                </small>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    name= 'password'
                />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputRepeatPassword1">Repeat password</label>
                <input
                    type="password"
                    className="form-control"
                    id="exampleInputRepeatPassword1"
                    placeholder="Repeat password"
                    name= 'repeatPassword'
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Submit
            </button>
        </form>

    )
}