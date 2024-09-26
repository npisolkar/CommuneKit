public class Item {
    private String itemName;
    private String itemDescription;
    private String itemID;
    private String itemCategory;
    private int itemRating;
    private boolean itemStatus;
    private ArrayList<Review> reviews;

    public Item(String itemName, String itemDescription, String itemID, String itemCategory, int itemRating) {
        this.itemName = itemName;
        this.itemDescription = itemDescription;
        this.itemID = itemID;
        this.itemCategory = itemCategory;
        this.itemRating = itemRating;
        this.itemStatus = false;
    }

    public String getItemName() {
        return itemName;
    }
    public void setItemName(String itemName) {
        this.itemName = itemName;
    }
    public String getItemDescription() {
        return itemDescription;
    }
    public void setItemDescription(String itemDescription) {
        this.itemDescription = itemDescription;
    }
    public String getItemID() {
        return itemID;
    }
    public String getItemCategory() {
        return itemCategory;
    }
    public void setItemCategory(String itemCategory) {
        this.itemCategory = itemCategory;
    }
    public int getItemRating() {
        return itemRating;
    }
    public void setItemRating(int itemRating) {
        this.itemRating = itemRating;
    }
    public boolean getItemStatus() {
        return itemStatus;
    }
    public void setItemStatus(boolean itemStatus) {
        this.itemStatus = itemStatus;
    }
    public ArrayList<Review> getReviews() {
        return reviews;
    }
    public void addReviews(Review review){
        reviews.add(review);
    }

    public void updateRating() {
        if (reviews.size() == 0) {
            return;
        }

        float sum = 0;
        for (Review review : reviews) {
            sum += review.getRating();
        }
        rating = sum / reviews.size();
    }
}