# -*- coding: utf-8 -*-
import random
from odoo import http

class CustomPage(http.Controller):
    @http.route('/custom_page/data/', auth='public', type='json')
    def index(self, **kw):
        x_data = ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        y_data = list(range(10000))
        random.shuffle(x_data)
        return {
            'x_data': x_data,
            'y_data': random.choices(y_data, k=len(x_data)),
        }

    # @http.route('/custom_page/custom_page/objects/', auth='public')
    # def list(self, **kw):
    #     return http.request.render('custom_page.listing', {
    #         'root': '/custom_page/custom_page',
    #         'objects': http.request.env['custom_page.custom_page'].search([]),
    #     })

    # @http.route('/custom_page/custom_page/objects/<model("custom_page.custom_page"):obj>/', auth='public')
    # def object(self, obj, **kw):
    #     return http.request.render('custom_page.object', {
    #         'object': obj
    #     })