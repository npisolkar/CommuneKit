public class Review {
    private int reviewID;
    private int userID;
    private int itemID;
    private String comment;
    private float rating;
    public Review(int reviewID, int userID, int itemID, String comment, float rating) {
        this.reviewID = reviewID;
        this.userID = userID;
        this.itemID = itemID;
        this.comment = comment;
        this.rating = rating;
    }
    public int getReviewID() {
        return reviewID;
    }
    public void setReviewID(int reviewID) {
        this.reviewID = reviewID;
    }
    public int getUserID() {
        return userID;
    }
    public void setUserID(int userID) {
        this.userID = userID;
    }
    public int getItemID() {
        return itemID;
    }
    public void setItemID(int itemID) {
        this.itemID = itemID;
    }
    public String getComment() {
        return comment;
    }
    public void setComment(String comment) {
        this.comment = comment;
    }
    public float getRating() {
        return rating;
    }
    public void setRating(float rating) {
        this.rating = rating;
    }
}