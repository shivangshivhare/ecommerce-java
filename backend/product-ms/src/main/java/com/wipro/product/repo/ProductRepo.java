package com.wipro.product.repo;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.wipro.product.entity.*;
public interface ProductRepo extends JpaRepository<Product, Long> {

	@Query("SELECT DISTINCT p.category FROM Product p")
	List<String> findDistinctCategories();

}
