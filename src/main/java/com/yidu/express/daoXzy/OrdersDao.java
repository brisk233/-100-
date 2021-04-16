package com.yidu.express.daoXzy;

import com.yidu.express.entity.Orders;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * (Orders)表数据库访问层
 *
 * @author makejava
 * @since 2021-04-13 16:23:59
 */
@Mapper
@Repository
public interface OrdersDao {

    /**
     * 通过ID查询单条数据
     *
     * @param order_number 主键
     * @return 实例对象
     */
    List<Orders> queryById(String order_number);

    /**
     * 通过ID批量查询数据
     *
     * @param order_numbers 订单号
     * @return 实例对象
     */
    List<Orders> queryByIds(String []order_numbers);

    /**
     * 查询所有订单号
     * @return
     */
    List<Orders> queryAllOrders();


    /**
     * 查询指定行数据
     *
     * @param offset 查询起始位置
     * @param limit 查询条数
     * @return 对象列表
     */
    List<Orders> queryAllByLimit(@Param("offset") int offset, @Param("limit") int limit);


    /**
     * 通过实体作为筛选条件查询
     *
     * @param orders 实例对象
     * @return 对象列表
     */
    List<Orders> queryAll(Orders orders);

    /**
     * 新增数据
     *
     * @param orders 实例对象
     * @return 影响行数
     */
    int insert(Orders orders);

    /**
     * 修改数据
     *
     * @param orders 实例对象
     * @return 影响行数
     */
    int update(Orders orders);

    /**
     * 通过主键删除数据
     *
     * @param orderId 主键
     * @return 影响行数
     */
    int deleteById(Integer orderId);

}