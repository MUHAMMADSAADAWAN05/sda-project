package COM.ONLIINE.FOOD.ORDERING.SYSTEM.PROJECT.repository;
import COM.ONLIINE.FOOD.ORDERING.SYSTEM.PROJECT.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
}
