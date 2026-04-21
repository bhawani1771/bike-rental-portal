import React from "react";
import "./page.css";

function Newblog() {
  const blogPosts = [
    { title: "Top 5 Bikes in your city Roads", excerpt: "Explore the best bikes suitable for local traffic and highway rides...", date: "April 19, 2026", category: "Guides" },
    { title: "Maintenance Tips for Rental Bikes", excerpt: "How we ensure every bike you rent is in pristine condition for your safety...", date: "April 18, 2026", category: "Tips" },
    { title: "New Fleet Arrival: 2026 Models", excerpt: "Exciting news! We have added the latest Maruti Suzuki e-Vitara inspired bikes...", date: "April 17, 2026", category: "News" },
  ];

  return (
    <div className="blog-page">
      <header className="blog-hero">
        <h1>Onn Bike Insights</h1>
        <p>Expert tips, road guides, and updates from the world of bike rentals.</p>
      </header>

      <div className="blog-container">
        <main className="blog-main">
          {blogPosts.map((post, index) => (
            <article key={index} className="blog-card">
              <span className="category-tag">{post.category}</span>
              <h2>{post.title}</h2>
              <p className="date">{post.date}</p>
              <p>{post.excerpt}</p>
              <button className="read-more">Read More →</button>
            </article>
          ))}
        </main>

        <aside className="blog-sidebar">
          <div className="sidebar-box">
            <h3>Popular Categories</h3>
            <ul>
              <li>Rental Tips</li>
              <li>Road Safety</li>
              <li>Latest Fleet</li>
              <li>Travel Guides</li>
            </ul>
          </div>
          <div className="sidebar-box newsletter">
            <h3>Join our Newsletter</h3>
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </aside>
      </div>
    </div>
  );
}

export  {Newblog};