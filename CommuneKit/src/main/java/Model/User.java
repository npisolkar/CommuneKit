package Model;


import jakarta.persistence.*;

@Entity
@Table (name = "user_info")
public class User {

    public Long getId() {
        return id;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    public String getUser() {
        return username;
    }

    public void setUser(String user) {
        this.username = user;
    }

    @Column(name = "user_name")
    private String username;


}
