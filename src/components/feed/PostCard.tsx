import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  return (
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
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-accent px-2 sm:px-3">
              <Heart className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm">{likes}</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary px-2 sm:px-3">
              <MessageCircle className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm">{comments}</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-success px-2 sm:px-3">
              <Share2 className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm">{shares}</span>
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-warning">
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;