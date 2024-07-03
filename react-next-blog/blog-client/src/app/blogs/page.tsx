import {BlogTable} from "@/app/components/BlogTable";

export default function BlogListPage() {

    return (
        <div className="card bg-white mt-3">
            <div className="card-header">
                <h4 className="py-2 ">List Blog</h4>
            </div>
            <div className="card-body">
                <BlogTable searchQuery={''}  onHasSearched={false}/>
            </div>
        </div>
    );
}
