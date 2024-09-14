import React, { useEffect, useState } from "react";
import { Card, Row, Col, Spin, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/BaseURL";
import useFetch from "../hooks/useFetch";
import "./BlogList.css";

const { Meta } = Card;

const BlogList = () => {
  const navigate = useNavigate();
  const { data: blogs, loading, error } = useFetch(`${BASE_URL}/blogs`);

  const handleReadMore = (id) => {
    navigate(`/blogs/${id}`);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <p>Failed to load blogs. Please try again later.</p>;
  }

  return (
    <div className="blog-list-container">
      <h1 className="text-center blog-list-title">Our Latest Blogs</h1>
      <Row gutter={[16, 16]} justify="center">
        {blogs?.map((blog) => (
          <Col xs={24} sm={12} md={8} lg={6} key={blog._id}>
            <Card
              hoverable
              cover={
                <img
                  alt={blog.title}
                  src={blog.imageUrl || "https://via.placeholder.com/300"}
                  className="blog-image"
                />
              }
              className="blog-card"
            >
              <Meta title={blog.title} description={`By ${blog.author}`} />
              <p className="blog-content-preview">
                {blog.content.substring(0, 100)}...
              </p>
              <Button
                type="primary"
                block
                onClick={() => handleReadMore(blog._id)}
              >
                Read More
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BlogList;
