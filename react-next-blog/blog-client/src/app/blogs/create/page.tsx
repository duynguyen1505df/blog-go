import React from 'react';
import Link from "next/link";
import FormInput from "@/app/components/FormInput";
import {Blog} from "@/app/models/blog";

const CreateBlogPage = () => {
    return (
        <div className="card mt-3">
            <div className="card-header">
                <h4 className={"py-1"}>Create Blog</h4>
                <span className="float-end mx-3">
          <Link href="/blogs" className="text-decoration-none">
           <i className="fa-solid fa-chevron-left"></i>
            Back to List
          </Link>
      </span>
            </div>
            <div className="card-body mt-3">
               <FormInput mode={'create'} id={0}/>
            </div>
        </div>
    );
};

export default CreateBlogPage;