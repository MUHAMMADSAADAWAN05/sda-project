package COM.ONLIINE.FOOD.ORDERING.SYSTEM.PROJECT.repository;
import COM.ONLIINE.FOOD.ORDERING.SYSTEM.PROJECT.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
}
