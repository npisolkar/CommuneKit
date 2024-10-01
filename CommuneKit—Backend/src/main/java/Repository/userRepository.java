package Repository;

import Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface userRepository extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u WHERE u.username LIKE %?1%")
    List<User> getContainingUser(String word);
}