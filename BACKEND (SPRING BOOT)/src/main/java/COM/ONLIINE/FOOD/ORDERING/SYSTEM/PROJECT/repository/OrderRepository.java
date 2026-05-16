package COM.ONLIINE.FOOD.ORDERING.SYSTEM.PROJECT.repository;
import COM.ONLIINE.FOOD.ORDERING.SYSTEM.PROJECT.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("SELECT o FROM Order o WHERE o.restaurant.id = :rid")
    List<Order> findOrdersByRestaurantId(@Param("rid") Long restaurantId);
}
