'use client'
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";

export const Sidebar = () => {
    const router = useRouter();
    const pathName = usePathname();
    const isActive = (route: any) => {
        return pathName.toLowerCase() === route;
    };

    const linkClassName = (path: string) => {
        return `nav-link text-dark ${isActive(path) ? 'active text-white bg-secondary' : ''}`;
    };

    return (
        <section className={"sidebars card-body px-1"}>
            <div className="d-flex flex-column">
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <Link href="/blogs" className={`nav-link text-dark ${linkClassName('/blogs')}`}>
                            <i className="fa-solid fa-list me-2"></i>
                            List
                        </Link>
                    </li>
                    <li>
                        <Link href="/blogs/create"
                              className={`nav-link text-dark ${linkClassName('/blogs/create')}`}>
                            <i className="fa-regular fa-square-plus me-2"></i>
                            New
                        </Link>
                    </li>
                    <li>
                        <Link href="/blogs/search"
                              className={`nav-link text-dark ${linkClassName('/blogs/search')}`}>
                            <i className="fa-solid fa-magnifying-glass me-2"></i>
                            Search
                        </Link>
                    </li>
                </ul>
            </div>
        </section>
    );
};
