import React, { useState } from 'react';
import { Smile, ThumbsUp, MessageCircle } from 'lucide-react';

interface Comment {
  username: string;
  avatar: string;
  content: string;
  timestamp: string;
  upvotes: number;
}

const Community: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([
    {
      username: 'EcoHero',
      avatar: '🌍',
      content: 'Just planted my first tree! Feeling great!',
      timestamp: '1 hour ago',
      upvotes: 12,
    },
    {
      username: 'GreenGiant',
      avatar: '🌱',
      content: 'Does anyone have tips for growing an avocado tree?',
      timestamp: '3 hours ago',
      upvotes: 5,
    },
  ]);

  const upvoteComment = (index: number) => {
    const newComments = [...comments];
    newComments[index].upvotes += 1;
    setComments(newComments);
  };

  return (
    <section className="community">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            <MessageCircle className="section-icon" />
            Community Stories
          </h2>
          <p className="section-description">
            Share your planting stories, get advice, and inspire others.
          </p>
        </div>

        <div className="comments-list">
          {comments.map((comment, index) => (
            <div key={index} className="comment">
              <div className="comment-avatar">{comment.avatar}</div>
              <div className="comment-content">
                <h3 className="comment-username">{comment.username}</h3>
                <p className="comment-text">{comment.content}</p>
                <div className="comment-footer">
                  <span className="comment-timestamp">{comment.timestamp}</span>
                  <button 
                    className="upvote-button" 
                    onClick={() => upvoteComment(index)}
                  >
                    <ThumbsUp className="upvote-icon" /> {comment.upvotes}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="post-comment">
          <Smile className="post-icon" />
          <textarea 
            className="post-input" 
            placeholder="Share your story..."
          />
          <button className="post-button">Post</button>
        </div>
      </div>
    </section>
  );
};

export default Community;

