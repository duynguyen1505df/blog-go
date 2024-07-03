'use client'
import {useEffect, useState} from "react";
import {BlogsService} from "@/app/services/blogsService";
import {Blog} from "@/app/models/blog";

const services = new BlogsService();

export const List = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        services.getList().then(res => {
            if (res) {
                setBlogs(res);
            } else {
                setError('Không thể tải dữ liệu');
            }
        }).catch(err => {
            console.error('Lỗi khi tải blogs:', err);
            setError('Có lỗi xảy ra khi tải dữ liệu');
        });
    }, []);

    const deleteBlog = (id: number) => {
        services.deleteById(id).then(res => {
            console.log(res);
            if (res) {
                setBlogs(blogs.filter(blog => blog.id !== id));
            } else {
                setError('Không thể xóa bài viết');
            }
        }).catch(err => {
            console.error('Lỗi khi xóa bài viết:', err);
            setError('Có lỗi xảy ra khi xóa bài viết');
        });
    }

    if (error) {
        return <div>Lỗi: {error}</div>;
    }

    return (
        <ul>
            {blogs.map(blog => (
                    <li key={blog.id}>
                        {blog.title}
                        <button className="btn btn-sm btn-danger" onClick={() => deleteBlog(blog.id)}> x </button>
                    </li>

            ))}
        </ul>
    );
};
