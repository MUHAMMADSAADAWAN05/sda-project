package COM.ONLIINE.FOOD.ORDERING.SYSTEM.PROJECT.repository;
import COM.ONLIINE.FOOD.ORDERING.SYSTEM.PROJECT.model.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
    List<MenuItem> findByRestaurantId(Long restaurantId);
}
