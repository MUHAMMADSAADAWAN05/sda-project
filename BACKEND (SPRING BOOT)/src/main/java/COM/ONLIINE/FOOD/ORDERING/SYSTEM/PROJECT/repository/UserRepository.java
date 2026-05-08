package COM.ONLIINE.FOOD.ORDERING.SYSTEM.PROJECT.repository;
import COM.ONLIINE.FOOD.ORDERING.SYSTEM.PROJECT.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}

