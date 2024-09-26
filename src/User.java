import java.util.ArrayList;

public class User {
    private int userID;
    private String userName;
    private String password;
    private String email;
    private String phone;
    private String address;
    private String bio;
    private boolean isBanned;
    private boolean isAdmin;
    private boolean isOwner;
    private ArrayList<Review> reviews;
    private float rating;
    private ArrayList<Item> items;
    private ArrayList<Item> lentItems
    private ArrayList<Item> borrowedItems;

    public User(int userID, String userName, String password, String email, String phone, String address, String bio) {
        this.userID = userID;
        this.userName = userName;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.bio = bio;
        this.isBanned = false;
        this.isAdmin = false;
        this.isOwner = false;
        this.reviews = new ArrayList<Review>();
        this.rating = 0;
        this.items = new ArrayList<Item>();
        this.lentItems = new ArrayList<Item>();
        this.borrowedItems = new ArrayList<Item>();

    }

    public User(int userID, String userName, String password, String email, String phone, String address, String bio, boolean isBanned, boolean isAdmin, boolean isOwner) {
        this.userID = userID;
        this.userName = userName;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.bio = bio;
        this.isBanned = isBanned;
        this.isAdmin = isAdmin;
        this.isOwner = isOwner;
    }

    public int getUserID() {
        return userID;
    }
    public void setUserID(int userID) {
        this.userID = userID;
    }
    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public String getBio() {
        return bio;
    }
    public void setBio(String bio) {
        this.bio = bio;
    }
    public boolean isBanned() {
        return isBanned;
    }
    public void setBanned(boolean banned) {
        isBanned = banned;
    }
    public boolean isAdmin() {
        return isAdmin;
    }
    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }
    public boolean isOwner() {
        return isOwner;
    }
    public void setOwner(boolean owner) {
        isOwner = owner;
    }

    public float getRating() {
        return rating;
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

    public void addReview(Review review) {
        reviews.add(review);
    }

    public ArrayList<Review> getReviews() {
        return reviews;
    }






}
