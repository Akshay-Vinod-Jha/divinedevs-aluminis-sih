import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface PostCardProps {
  author: {
    name: string;
    title: string;
    avatar: string;
    batchYear: number;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  tags?: string[];
  media?: string;
}

const PostCard = ({ author, content, timestamp, likes, comments, shares, tags, media }: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [commentCount, setCommentCount] = useState(comments);
  const [shareCount, setShareCount] = useState(shares);
  
  // Modal states
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  
  // Sample comments data
  const [postComments, setPostComments] = useState([
    {
      id: 1,
      author: "John Smith",
      avatar: "/api/placeholder/32/32",
      content: "Congratulations! This is really inspiring!",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      author: "Emily Johnson",
      avatar: "/api/placeholder/32/32", 
      content: "Amazing achievement! Keep up the great work 👏",
      timestamp: "1 hour ago"
    }
  ]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    
    // Show feedback
    const message = isLiked ? "Removed like" : "Liked! ❤️";
    // You could add a toast notification here
    console.log(message);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    
    // Show feedback
    const message = isBookmarked ? "Removed from bookmarks" : "Bookmarked! 🔖";
    // You could add a toast notification here  
    console.log(message);
  };

  const handleComment = () => {
    setIsCommentModalOpen(true);
  };

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  const submitComment = () => {
    if (!commentText.trim()) return;
    
    const newComment = {
      id: postComments.length + 1,
      author: "You",
      avatar: "/api/placeholder/32/32",
      content: commentText,
      timestamp: "Just now"
    };
    
    setPostComments(prev => [...prev, newComment]);
    setCommentCount(prev => prev + 1);
    setCommentText("");
    
    console.log("Comment added:", newComment);
    // You could add a toast notification here
  };

  const handleSharePost = (shareType: string) => {
    setShareCount(prev => prev + 1);
    setIsShareModalOpen(false);
    
    // Simulate sharing
    console.log(`Shared via ${shareType}`);
    alert(`Post shared via ${shareType}! 🚀`);
  };

  return (
    <>
      <Card className="professional-card">
        <CardContent className="p-4 sm:p-6">
          {/* Post Header */}
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <Avatar className="h-10 w-10 sm:h-12 sm:w-12 alma-shadow flex-shrink-0">
                <AvatarImage src={author.avatar} alt={author.name} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {author.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-foreground text-sm sm:text-base truncate">{author.name}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground truncate">{author.title}</p>
                <p className="text-xs text-muted-foreground">Class of {author.batchYear} • {timestamp}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>

          {/* Post Content */}
          <div className="mb-3 sm:mb-4">
            <p className="text-foreground leading-relaxed mb-3 text-sm sm:text-base">{content}</p>
            
            {/* Media */}
            {media && (
              <div className="rounded-lg overflow-hidden alma-shadow mb-3">
                <img 
                  src={media} 
                  alt="Post media" 
                  className="w-full h-48 sm:h-64 object-cover"
                />
              </div>
            )}

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Post Actions */}
          <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-border">
            <div className="flex items-center space-x-3 sm:space-x-6">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`px-2 sm:px-3 transition-colors duration-200 ${
                  isLiked 
                    ? 'text-red-500 hover:text-red-600' 
                    : 'text-muted-foreground hover:text-red-500'
                }`}
                onClick={handleLike}
              >
                <Heart className={`h-4 w-4 mr-1 sm:mr-2 ${isLiked ? 'fill-current' : ''}`} />
                <span className="text-xs sm:text-sm">{likeCount}</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-muted-foreground hover:text-primary px-2 sm:px-3"
                onClick={handleComment}
              >
                <MessageCircle className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="text-xs sm:text-sm">{commentCount}</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-muted-foreground hover:text-success px-2 sm:px-3"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="text-xs sm:text-sm">{shareCount}</span>
              </Button>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`transition-colors duration-200 ${
                isBookmarked 
                  ? 'text-yellow-500 hover:text-yellow-600' 
                  : 'text-muted-foreground hover:text-yellow-500'
              }`}
              onClick={handleBookmark}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Comments Modal */}
      <Dialog open={isCommentModalOpen} onOpenChange={setIsCommentModalOpen}>
        <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Comments</DialogTitle>
          </DialogHeader>
          
          {/* Comments List */}
          <div className="flex-1 overflow-y-auto space-y-4 py-4">
            {postComments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src={comment.avatar} alt={comment.author} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {comment.author.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="bg-surface rounded-lg p-3">
                    <p className="font-medium text-sm text-foreground">{comment.author}</p>
                    <p className="text-sm text-foreground mt-1">{comment.content}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 ml-3">{comment.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Add Comment */}
          <div className="border-t pt-4">
            <div className="flex space-x-2">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage src="/api/placeholder/32/32" alt="You" />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  You
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 flex space-x-2">
                <Textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  className="min-h-[60px] resize-none text-sm"
                />
                <Button
                  onClick={submitComment}
                  disabled={!commentText.trim()}
                  className="alma-gradient"
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Share Modal */}
      <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Post</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="flex flex-col items-center p-4 h-auto"
                onClick={() => handleSharePost("AlmaConnect")}
              >
                <Share2 className="h-6 w-6 mb-2 text-primary" />
                <span className="text-sm">Share to Feed</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center p-4 h-auto"
                onClick={() => handleSharePost("Direct Message")}
              >
                <MessageCircle className="h-6 w-6 mb-2 text-accent" />
                <span className="text-sm">Send Message</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center p-4 h-auto"
                onClick={() => handleSharePost("LinkedIn")}
              >
                <Share2 className="h-6 w-6 mb-2 text-blue-600" />
                <span className="text-sm">LinkedIn</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center p-4 h-auto"
                onClick={() => handleSharePost("Copy Link")}
              >
                <Bookmark className="h-6 w-6 mb-2 text-success" />
                <span className="text-sm">Copy Link</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostCard;