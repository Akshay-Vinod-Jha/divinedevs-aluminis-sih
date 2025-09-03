import { Image, Smile, Calendar, MapPin, X, Upload, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const CreatePost = () => {
  const [postText, setPostText] = useState("");
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isFeelingModalOpen, setIsFeelingModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Form states
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: ""
  });
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedFeeling, setSelectedFeeling] = useState("");

  const feelings = [
    "😊 Happy", "🎉 Excited", "💪 Motivated", "🤔 Thoughtful", 
    "🙏 Grateful", "💼 Professional", "🎯 Focused", "✨ Inspired"
  ];

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPhotos = Array.from(files).map(file => URL.createObjectURL(file));
      setSelectedPhotos(prev => [...prev, ...newPhotos]);
    }
  };

  const removePhoto = (index: number) => {
    setSelectedPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSharePost = () => {
    // Simulate posting
    const postData = {
      content: postText,
      photos: selectedPhotos,
      event: eventData.title ? eventData : null,
      location: selectedLocation,
      feeling: selectedFeeling,
      timestamp: new Date().toISOString()
    };
    
    console.log("Posting:", postData);
    
    // Reset form
    setPostText("");
    setSelectedPhotos([]);
    setEventData({ title: "", date: "", time: "", location: "", description: "" });
    setSelectedLocation("");
    setSelectedFeeling("");
    setIsShareModalOpen(false);
    
    // Show success (you could add a toast notification here)
    alert("Post shared successfully! 🎉");
  };

  return (
    <>
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
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="Share your thoughts, achievements, or career updates with the AlmaConnect community..."
                className="min-h-[80px] sm:min-h-[100px] resize-none border-0 p-0 focus-visible:ring-0 text-sm sm:text-base placeholder:text-muted-foreground bg-transparent"
              />
              
              {/* Show selected attachments */}
              {selectedPhotos.length > 0 && (
                <div className="mt-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    📷 {selectedPhotos.length} photo(s) selected
                  </Badge>
                </div>
              )}
              {eventData.title && (
                <div className="mt-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    📅 Event: {eventData.title}
                  </Badge>
                </div>
              )}
              {selectedLocation && (
                <div className="mt-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    📍 {selectedLocation}
                  </Badge>
                </div>
              )}
              {selectedFeeling && (
                <div className="mt-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {selectedFeeling}
                  </Badge>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border gap-3">
                {/* Action Buttons */}
                <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-muted-foreground hover:text-primary flex-shrink-0 px-2 sm:px-3" 
                    title="Photo"
                    onClick={() => setIsPhotoModalOpen(true)}
                  >
                    <Image className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="hidden xs:inline text-xs sm:text-sm">Photo</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-muted-foreground hover:text-warning flex-shrink-0 px-2 sm:px-3" 
                    title="Event"
                    onClick={() => setIsEventModalOpen(true)}
                  >
                    <Calendar className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="hidden xs:inline text-xs sm:text-sm">Event</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-muted-foreground hover:text-success flex-shrink-0 px-2 sm:px-3" 
                    title="Location"
                    onClick={() => setIsLocationModalOpen(true)}
                  >
                    <MapPin className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="hidden xs:inline text-xs sm:text-sm">Location</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-muted-foreground hover:text-accent flex-shrink-0 px-2 sm:px-3" 
                    title="Feeling"
                    onClick={() => setIsFeelingModalOpen(true)}
                  >
                    <Smile className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline text-xs sm:text-sm">Feeling</span>
                  </Button>
                </div>
                
                {/* Share Button */}
                <Button 
                  className="alma-gradient text-primary-foreground w-full sm:w-auto sm:ml-4 text-sm sm:text-base py-2 sm:py-2.5"
                  onClick={() => setIsShareModalOpen(true)}
                  disabled={!postText.trim() && selectedPhotos.length === 0 && !eventData.title && !selectedLocation && !selectedFeeling}
                >
                  Share Post
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Photo Upload Modal */}
      <Dialog open={isPhotoModalOpen} onOpenChange={setIsPhotoModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Photos</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-surface">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">PNG, JPG or GIF (MAX. 10MB)</p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  multiple 
                  accept="image/*"
                  onChange={handlePhotoUpload}
                />
              </label>
            </div>
            
            {selectedPhotos.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {selectedPhotos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={photo} 
                      alt={`Upload ${index + 1}`}
                      className="w-full h-20 object-cover rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6"
                      onClick={() => removePhoto(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            
            <Button 
              onClick={() => setIsPhotoModalOpen(false)}
              className="w-full"
              disabled={selectedPhotos.length === 0}
            >
              Add {selectedPhotos.length} Photo(s)
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Event Modal */}
      <Dialog open={isEventModalOpen} onOpenChange={setIsEventModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Event</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="event-title">Event Title</Label>
              <Input
                id="event-title"
                value={eventData.title}
                onChange={(e) => setEventData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Alumni Tech Meetup"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="event-date">Date</Label>
                <Input
                  id="event-date"
                  type="date"
                  value={eventData.date}
                  onChange={(e) => setEventData(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="event-time">Time</Label>
                <Input
                  id="event-time"
                  type="time"
                  value={eventData.time}
                  onChange={(e) => setEventData(prev => ({ ...prev, time: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="event-location">Location</Label>
              <Input
                id="event-location"
                value={eventData.location}
                onChange={(e) => setEventData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="San Francisco, CA"
              />
            </div>
            <div>
              <Label htmlFor="event-description">Description</Label>
              <Textarea
                id="event-description"
                value={eventData.description}
                onChange={(e) => setEventData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Join us for an exciting tech meetup..."
                className="min-h-[80px]"
              />
            </div>
            <Button 
              onClick={() => setIsEventModalOpen(false)}
              className="w-full"
              disabled={!eventData.title}
            >
              Add Event
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Location Modal */}
      <Dialog open={isLocationModalOpen} onOpenChange={setIsLocationModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Location</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="location">Where are you?</Label>
              <Input
                id="location"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                placeholder="San Francisco, CA"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {["San Francisco, CA", "New York, NY", "London, UK", "Remote"].map((loc) => (
                <Button
                  key={loc}
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedLocation(loc)}
                  className="text-xs"
                >
                  {loc}
                </Button>
              ))}
            </div>
            <Button 
              onClick={() => setIsLocationModalOpen(false)}
              className="w-full"
              disabled={!selectedLocation}
            >
              Add Location
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Feeling Modal */}
      <Dialog open={isFeelingModalOpen} onOpenChange={setIsFeelingModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>How are you feeling?</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {feelings.map((feeling) => (
                <Button
                  key={feeling}
                  variant={selectedFeeling === feeling ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFeeling(feeling)}
                  className="text-xs justify-start"
                >
                  {feeling}
                </Button>
              ))}
            </div>
            <Button 
              onClick={() => setIsFeelingModalOpen(false)}
              className="w-full"
              disabled={!selectedFeeling}
            >
              Add Feeling
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Share Post Confirmation Modal */}
      <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Post</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-surface rounded-lg">
              <p className="text-sm text-muted-foreground">Preview:</p>
              <p className="text-sm mt-2">{postText || "No text content"}</p>
              {selectedPhotos.length > 0 && (
                <p className="text-xs text-muted-foreground mt-2">📷 {selectedPhotos.length} photo(s)</p>
              )}
              {eventData.title && (
                <p className="text-xs text-muted-foreground mt-1">📅 {eventData.title}</p>
              )}
              {selectedLocation && (
                <p className="text-xs text-muted-foreground mt-1">📍 {selectedLocation}</p>
              )}
              {selectedFeeling && (
                <p className="text-xs text-muted-foreground mt-1">{selectedFeeling}</p>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsShareModalOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleSharePost} className="flex-1 alma-gradient">
                Share Now
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreatePost;