package com.yidu.express.controller;

import com.yidu.express.entity.Orders;
import com.yidu.express.serviceXzy.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * (Orders)表控制层
 *
 * @author makejava
 * @since 2021-04-13 16:23:59
 */
@Controller
public class OrdersController {
    /**
     * 服务对象
     */
    @Autowired
    private OrdersService ordersService;

    /**
     * 通过订单号查询单条数据
     * @param order_number 订单号
     * @return 单条数据
     */
    @ResponseBody
    @RequestMapping("selectOne")
    public String selectOne(String order_number, HttpServletRequest request) {
        List<Orders> list=this.ordersService.queryById(order_number);
        List<Orders> ordersList=this.ordersService.queryAllOrders();
        for(Orders l:ordersList){
            if(l.getOrderNumber().equals(order_number)){
                request.setAttribute("list",list);
                return "come on baby!";
            }else{
                return "此订单号为空";
            }
        }
        return "";
    }

    /**
     * 通过订单号查询单条数据
     * @param order_numbers 订单号
     * @return 单条数据
     */
    @ResponseBody
    @RequestMapping("selectMany")
    public String selectMany(String [] order_numbers) {
        List<Orders> list=this.ordersService.queryByIds(order_numbers);
        return "";
    }


}