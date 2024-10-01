public class Owner extends User {

    public Owner(int userID, String userName, String password, String email, String phone, String address, String bio) {
        super(userID, userName, password, email, phone, address, bio);
        this.setOwner(true);
    }

    public void addAdmin(User user) {
        if (!user.isAdmin()) {
            user.setAdmin(true);
        }
    }

    public void removeAdmin(User user) {
        if (user.isAdmin()) {
            user.setAdmin(false);
        }
    }
}
