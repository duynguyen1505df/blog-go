import Link from "next/link";

export const Header = () => {
    return (
        <header className="position-sticky top-0 end-0 start-0">
            <nav
                className="navbar navbar-expand-sm navbar-toggleable-sm navbar-dark bg-dark text-white border-bottom box-shadow">
                <div className="container-fluid">
                    <Link className="navbar-brand" href="/">
                        <img src="https://devfast.us/images/devfast-logo.png" alt="logo"
                             className="mx-5" width="50"/>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse d-sm-inline-flex justify-content-center">
                        <h5>Blog Management</h5>
                    </div>
                </div>
            </nav>
        </header>
    );
};