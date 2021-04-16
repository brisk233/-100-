package com.yidu.express.controller;

import com.yidu.express.entity.Customer;
import com.yidu.express.serviceXzy.CustomerService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * (Customer)表控制层
 *
 * @author makejava
 * @since 2021-04-12 18:49:39
 */
@Controller
public class CustomerController {
    /**
     * 服务对象
     */
    @Resource
    private CustomerService customerService;

    /**
     * 通过主键查询单条数据
     *
     * @param id 主键
     * @return 单条数据
     */
    @GetMapping("selectOne")
    public Customer selectOne(Integer id) {
        return this.customerService.queryById(id);
    }

}