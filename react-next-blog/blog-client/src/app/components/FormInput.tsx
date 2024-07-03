'use client'
import React, {useEffect, useState} from 'react';
import {BlogsService} from "@/app/services/blogsService";
import {Blog} from "@/app/models/blog";
import {useRouter} from "next/navigation";
import {Loading} from "@/app/components/Loading";

const blogService = new BlogsService();

export default function FormInput(props: { id: number, mode: string }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [formData, setFormData] = useState<Blog>(new Blog()); // Khởi tạo giá trị ban đầu bằng blog
    const [selectedPositions, setSelectedPositions] = useState<number[]>( []); // Khởi tạo giá trị ban đầu cho positions
    const locations = [{id: 1, name: "Việt Nam"}, {id: 2, name: "Châu Á"}, {id: 3, name: "Châu Âu"}, {id: 4, name: "Châu Mỹ"}];

    useEffect(() =>{
        if (props.id > 0) {
            blogService.getById(props.id).then(result => {
                setFormData(result);
                setSelectedPositions(result.position.split(',').map((pos: string) => parseInt(pos)));
                setIsLoading(false);
            }).catch(error => {
                setFormData(new Blog());
            });
        }
        else {
            setFormData(new Blog());
            setIsLoading(false);
        }
    }, [props.id]);

    function handleInputChange(event: any) {
        const {name, value, type, checked} = event.target;
        console.log({name, value});
        if (type === "checkbox") {
            setSelectedPositions(prevSelectedPositions =>
                checked ? [...prevSelectedPositions, parseInt(value)] : prevSelectedPositions.filter(id => id !== parseInt(value))
            );
        } else if (type === "radio") {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: parseInt(value) == 1
            }));
        }
        else if (name === "category") {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: parseInt(value)
            }));
        }
        else {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: value
            }));
        }
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        setIsLoading(true);
        const positionString = selectedPositions.join(',');
        const completeFormData: Blog = {
            ...formData,
            position: positionString
        };
        if (props.mode === 'create') {
            blogService.create(completeFormData).then(() => {
                router.push('/blogs');
            });
        } else if (props.mode === 'update') {
            console.log(completeFormData);
            blogService.update(completeFormData).then(() => {
                router.push('/blogs');
            });
        }
    }

    if (isLoading) {
        return (
            <Loading/>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="hidden" name="id" value={formData.id }/>
            <div className="px-4 py-3 ">
                <div className="form-group my-3">
                    <label className="control-label">Tiêu đề</label>
                    <input className="form-control"
                           name="title"
                           value={formData.title}
                           onChange={handleInputChange}/>
                </div>
                <div className="form-group my-3">
                    <label className="control-label">Mô tả ngắn</label>
                    <textarea
                        className="form-control" rows={3}
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <div className="form-group my-3">
                    <label className="control-label">Chi tiết</label>
                    <textarea
                        className="form-control" rows={5}
                        name="detail"
                        value={formData.detail}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="FormFile" className="control-label">
                        Hình ảnh
                    </label>
                    <div>
                        <input type='file'
                               className="form-control"
                               name="thumbs"
                               onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="form-group my-3">
                    <label className="control-label">Vị trí</label>
                    <div className="d-flex align-content-center">
                        {
                           locations == null ? '' :  locations.map(location => (
                                <div key={location.id}>
                                    <input
                                        className="me-1"
                                        id={`position-${location.id}`}
                                        name={`position-${location.id}`}
                                        type="checkbox"
                                        value={location.id}
                                        checked={selectedPositions == null ? false : selectedPositions.includes(location.id)}
                                        onChange={handleInputChange}/>
                                    <label htmlFor={`position-${location.id}`} className="me-3">{location.name}</label>
                                    <br/>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="form-group my-3">
                    <label className="control-label">Public</label>
                    <div className="d-flex">
                        <input
                            className="me-1"
                            name="public_status"
                            id="public-yes"
                            type="radio"
                            value={0}
                            checked={formData.public_status == 0}
                            onChange={handleInputChange}/>
                        <label htmlFor="public-yes" className="me-3">No</label>
                        <input
                            className="me-1"
                            id="public-no"
                            name="public_status" type="radio"
                            onChange={handleInputChange}
                            value={1}
                            checked={formData.public_status == 1}/>

                        <label htmlFor="public-no" className="me-3">Yes</label>
                        <br/>
                    </div>
                </div>
                <div className="d-flex">
                    <div className="form-group w-50 me-2">
                        <label htmlFor="category" className="control-label">Loại:</label>
                        <select name="category"
                                value={formData.category}
                                onChange={handleInputChange} className="form-select">
                            <option value={0}>Chưa xác định</option>
                            <option value={1}>Kinh doanh</option>
                            <option value={2}>Giải trí</option>
                            <option value={3}>Thế giới</option>
                            <option value={4}>Thời sự</option>
                            <option value={5}>Khoa học</option>
                            <option value={6}>Công nghệ</option>
                            <option value={7}>Lịch sử</option>
                            <option value={8}>Xã hội</option>
                        </select>
                    </div>
                    <div className="form-group w-50 ms-2">
                        <label htmlFor="published_date" className="control-label">Ngày Public: </label>
                        <input name="published_date" type="date"
                               value={formData.published_date}
                               onChange={handleInputChange}
                               className="form-control"/>
                    </div>
                </div>
            </div>
            <div className="form-group bg-title p-3 rounded-bottom border-top">
                <div className="d-flex justify-content-center">
                    <input
                        type="submit"
                        value="Submit"
                        className="btn btn-success mx-1"/>
                    <input
                        type="reset"
                        value="Clear"
                        className="btn btn-primary mx-1"
                        onClick={() => setFormData(new Blog())}
                    />
                </div>
            </div>
        </form>
    );
}