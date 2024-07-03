'use client'
import React, {useEffect, useState} from 'react';
import {useParams} from "next/navigation";
import FormInput from "@/app/components/FormInput";
import Link from "next/link";
import {Blog} from "@/app/models/blog";
import {BlogsService} from "@/app/services/blogsService";
import {number} from "prop-types";

const blogService = new BlogsService();

export default function EditBlogPage() {
    const params = useParams();

    return (
        <div className="card mt-3">
            <div className="card-header">
                <h3>Edit Blog</h3>
                <span className="float-end mx-3">
                      <Link href="/blogs" className="text-decoration-none">
                           <i className="fa-solid fa-chevron-left"></i>
                            Back to List
                      </Link>
                </span>
            </div>
            <div className="card-body mt-3">
                    <FormInput mode={'update'} id={parseInt(params.id.toString())}/>
            </div>
        </div>
    );
};