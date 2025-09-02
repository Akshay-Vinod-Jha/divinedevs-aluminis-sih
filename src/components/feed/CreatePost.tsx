import { Image, Smile, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const CreatePost = () => {
  return (
    <Card className="professional-card">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start space-x-3 sm:space-x-4">
          <Avatar className="h-10 w-10 sm:h-12 sm:w-12 alma-shadow flex-shrink-0">
            <AvatarImage src="/api/placeholder/48/48" alt="Your profile" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              SJ
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <Textarea
              placeholder="Share your thoughts, achievements, or career updates with the AlmaConnect community..."
              className="min-h-[80px] sm:min-h-[100px] resize-none border-0 p-0 focus-visible:ring-0 text-sm sm:text-base placeholder:text-muted-foreground bg-transparent"
            />
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border gap-3">
              {/* Action Buttons */}
              <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary flex-shrink-0 px-2 sm:px-3" title="Photo">
                  <Image className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden xs:inline text-xs sm:text-sm">Photo</span>
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-warning flex-shrink-0 px-2 sm:px-3" title="Event">
                  <Calendar className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden xs:inline text-xs sm:text-sm">Event</span>
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-success flex-shrink-0 px-2 sm:px-3" title="Location">
                  <MapPin className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden xs:inline text-xs sm:text-sm">Location</span>
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-accent flex-shrink-0 px-2 sm:px-3" title="Feeling">
                  <Smile className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline text-xs sm:text-sm">Feeling</span>
                </Button>
              </div>
              
              {/* Share Button */}
              <Button className="alma-gradient text-primary-foreground w-full sm:w-auto sm:ml-4 text-sm sm:text-base py-2 sm:py-2.5">
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