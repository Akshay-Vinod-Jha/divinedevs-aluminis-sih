import { Image, Smile, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const CreatePost = () => {
  return (
    <Card className="professional-card mb-6">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Avatar className="h-12 w-12 alma-shadow">
            <AvatarImage src="/api/placeholder/48/48" alt="Your profile" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              SJ
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Share your thoughts, achievements, or career updates with the AlmaConnect community..."
              className="min-h-[100px] resize-none border-0 p-0 focus-visible:ring-0 text-base placeholder:text-muted-foreground bg-transparent"
            />
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                  <Image className="h-4 w-4 mr-2" />
                  Photo
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-warning">
                  <Calendar className="h-4 w-4 mr-2" />
                  Event
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-success">
                  <MapPin className="h-4 w-4 mr-2" />
                  Location
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-accent">
                  <Smile className="h-4 w-4 mr-2" />
                  Feeling
                </Button>
              </div>
              <Button variant="hero" size="sm" className="ml-4">
                Share Post
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatePost;