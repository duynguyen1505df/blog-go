import Link from "next/link";

export const Footer = () => {
    return (
        <footer className="border-top footer text-muted py-3 bg-dark text-white position-fix bottom-0 end-0 start-0">
            <div className="container">
                <article className="text-center text-white w-100">
                    &copy; 2024 - Devfast -
                    <Link href="/" className="ms-2" >Privacy</Link>
                </article>
            </div>
        </footer>
    );
};