'use client'
import {Loading} from "@/app/components/Loading";
import {useEffect, useState} from "react";
import {Blog} from "@/app/models/blog";
import {BlogsService} from "@/app/services/blogsService";
import Link from "next/link";


const services = new BlogsService();

export const BlogTable = (props: {searchQuery: string, onHasSearched: any}) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const locations = [{id: 1, name: "Việt Nam"}, {id: 2, name: "Châu Á"}, {id: 3, name: "Châu Âu"}, {id: 4, name: "Châu Mỹ"}];
    const categories = [{id: 1, name: "Kinh doanh"}, {id: 2, name: "Giải trí"}, {id: 3, name: "Thế giới"}, {id: 4, name: "Thời sự"}, {id: 5, name: "Khoa học"}, {id: 6, name: "Công nghệ"}, {id: 7, name: "Lịch sử"}, {id: 8, name: "Xã hội"}]

    const [hasSearched, setHasSearched] = useState(false);

    const getPositionName = (positionId: any) => {
        const position = locations.find(pos => pos.id === positionId);
        return position ? position.name : 'Không xác định';
    };

    useEffect(() => {
        setIsLoading(true);
        if(props.searchQuery !== '') {
            searchBlogs(props.searchQuery)
        }
        else {
            services.getList().then(res => {
                if (res) {
                    setBlogs(res);
                    setIsLoading(false);
                }
            });
        }

    }, [props.searchQuery, props.onHasSearched]);

    function searchBlogs(query: string) {
        if(query !== '') {
            services.getByTitle(query)
                .then(res => {
                    setBlogs(res);
                    setIsLoading(false);
                    props.onHasSearched(false);
                })
        }
    }

    function deleteBlog(id: number) {
        setIsLoading(true);
        services.deleteById(id).then(res => {
            if (res) {
            //    setBlogs(blogs.filter(blog => blog.id !== id));
                services.getList().then(res => {
                    setBlogs(res);
                    setIsLoading(false);
                })
            }
        })
    }


    if (isLoading) {
        return (
            <Loading/>
        );
    }

    return (
        <table className="table table-bordered my-1">
            <thead className="text-center">
            <tr>
                <th>Id.</th>
                <th>
                    Tin
                </th>
                <th>
                    Loại
                </th>
                <th>
                    Trạng thái
                </th>
                <th>
                    Vị trí
                </th>
                <th>
                    Ngày Public
                </th>
                <th>Thao tác</th>
            </tr>
            </thead>
            <tbody className="text-center">
            {blogs == null ? [] : blogs.map((blog,index) => (
                <tr key={blog.id}>
                    <td>{blog.id}</td>
                    <td className="w-25">{blog.title}</td>
                    <td>{
                        categories.map(c => {
                            if (c.id.toString() === blog.category.toString()) {
                                return c.name;
                            }
                        })
                    }</td>
                    <td>{blog.public_status == 1 ? "Yes" : "No"}</td>
                    <td className="w-25">
                        {blog.position == null ? '' : blog.position.split(',').map((pos: string) => parseInt(pos)).map((pos, index) => {
                        const name = getPositionName(pos);
                        return index !== blog.position.split(',').map((pos: string) => parseInt(pos)).length - 1 ? `${name}, ` : name;
                    })}</td>
                    <td>{blog.published_date}</td>
                    <td>
                        <Link href={`/blogs/edit/${blog.id}`} className="btn btn-sm btn-outline-primary mx-1">
                            <i className="fa-solid fa-pen-to-square me-1"></i>
                            Edit
                        </Link>
                        <button type="button"
                                onClick={() => deleteBlog(blog.id)}
                                className="btn btn-sm btn-outline-danger">
                            <i className="fa-solid fa-trash me-1"></i>
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>

    );
};