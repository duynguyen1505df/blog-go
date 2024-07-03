import {Blog} from "@/app/models/blog";
import Api from "@/app/services/Base/api";

export class BlogsService {
    private readonly api: Api = new Api();


    public getList(): Promise<Blog[]> {
        return this.api.get('/blogs');
    }

    public getById(id: number): Promise<Blog> {
        return this.api.get(`/blogs/${id}`);
    }

    public getByTitle(title: string): Promise<Blog[]> {
        return this.api.get(`/blogs?title=${title}`);
    }

    public create(blog: Blog): Promise<Blog> {
        return this.api.postAPI(`/blogs`, blog);
    }

    public update(blog: Blog): Promise<Blog> {
        return this.api.putAPI(`/blogs/${blog.id}`, blog);
    }


    public deleteById(id: number): Promise<Blog> {
        return this.api.deleteById(`/blogs`, id);
    }

}