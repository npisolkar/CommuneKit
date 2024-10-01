public class Admin extends User {

    public Admin(int userID, String userName, String password, String email, String phone, String address, String bio) {
        super(userID, userName, password, email, phone, address, bio);
        this.setAdmin(true);
    }

    public void banUser(User user) {
        user.setBanned(true);
    }

    public void unbanUser(User user) {
        user.setBanned(false);
    }
}
