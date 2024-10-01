import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;


public class Main {
    public static void addUser(User user) {
        String query = "INSERT INTO users (userName, password, email, phone, address, bio, isBanned, isAdmin, isOwner, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        try (Connection conn = MySQLConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(query)) {

            stmt.setString(1, user.getUserName());
            stmt.setString(2, user.getPassword());
            stmt.setString(3, user.getEmail());
            stmt.setString(4, user.getPhone());
            stmt.setString(5, user.getAddress());
            stmt.setString(6, user.getBio());
            stmt.setBoolean(7, user.isBanned());
            stmt.setBoolean(8, user.isAdmin());
            stmt.setBoolean(9, user.isOwner());
            stmt.setFloat(10, user.getRating());

            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public User getUser(int userID) {
        String query = "SELECT * FROM users WHERE userID = ?";
        try (Connection conn = MySQLConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(query)) {

            stmt.setInt(1, userID);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                return new User(
                        rs.getInt("userID"),
                        rs.getString("userName"),
                        rs.getString("password"),
                        rs.getString("email"),
                        rs.getString("phone"),
                        rs.getString("address"),
                        rs.getString("bio"),
                        rs.getBoolean("isBanned"),
                        rs.getBoolean("isAdmin"),
                        rs.getBoolean("isOwner")
                );
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
    public static void main(String[] args) {
        // Create a User object
        User user = new User(1, "john_doe", "password123", "john@example.com", "1234567890", "123 Main St", "Just a bio");

        // Create UserDAO object to interact with the database
        // UserDAO userDAO = new UserDAO();

        // Add the user to the database
        addUser(user);

        System.out.println("User added successfully!");
    }
}
